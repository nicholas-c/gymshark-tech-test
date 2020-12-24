import { NextApiRequest, NextApiResponse } from 'next'

type NextApiRequestWithQuery = NextApiRequest & {
  query: {
    offset: string,
    limit: string
  }
}

const exercisesApi = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {
  try {
    const request = await fetch('https://private-922d75-recruitmenttechnicaltest.apiary-mock.com/customexercises/');
    const data = await request.json();

    const { offset, limit } = {
      offset: Number.isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset),
      limit: Number.isNaN(parseInt(req.query.limit)) ? 30 : parseInt(req.query.limit)
    };

    const exercises = [...data.exercises].slice(offset, offset + limit);
    const remaining = data.exercises.length - (offset + limit);

    res.statusCode = 200;
    res.json({
      exercises,
      count: exercises.length,
      remaining: remaining >= 0 ? remaining : 0,
      total: data.exercises.length
    });
  } catch (e) {
    res.statusCode = 400;
    res.json({ error: true });
  }
};

export { exercisesApi as default }
