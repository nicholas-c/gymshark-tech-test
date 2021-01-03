import { NextApiRequest, NextApiResponse } from 'next';
import { slugify } from './../../utils';

type NextApiRequestWithQuery = NextApiRequest & {
  query: {
    offset: string,
    limit: string,
    groups: string,
    name: string
  }
}

type SingleExercise = {
  id: string,
  name: string,
  transcript: string,
  female: {
    image: string
  },
  male: {
    image: string
  },
  bodyAreas: Array<string>
}

const exercisesApi = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {
  try {
    const request = await fetch('https://private-922d75-recruitmenttechnicaltest.apiary-mock.com/customexercises/');
    let data = await request.json();

    const { offset, limit, groups, name } = {
      offset: Number.isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset),
      limit: Number.isNaN(parseInt(req.query.limit)) ? 30 : parseInt(req.query.limit),
      groups: req.query.groups,
      name: req.query.name
    };

    if (groups) {
      const filter = groups.split(',');

      data.exercises = data.exercises.filter((item: SingleExercise) => {
        let match = false;

        item.bodyAreas.forEach((area: string) => {
          const contains = filter.includes(area.toLowerCase());

          if (contains) {
            match = contains;
          }
        });

        return match;
      })
    }

    if (name) {
      data.exercises = data.exercises.filter(item => slugify(item.name) === name)
    }

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
    console.error(e)
    res.statusCode = 400;
    res.json({ error: true });
  }
};

export { exercisesApi as default }
