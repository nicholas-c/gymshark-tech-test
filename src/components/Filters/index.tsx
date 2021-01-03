import { useState } from 'react';
import { useRouter } from 'next/router';
import muscleGroups from '../../config/muscleGroups.json';
import { CaretDown, CaretUp } from "phosphor-react";

const Filters = ({groups}) => {
  const Router = useRouter();
  const [ filters, setFilters ] = useState(groups !== '' ? groups.split(',') : []);
  const [ isOpen, setOpen ] = useState(false);

  const updateFilters = e => {
    const inputName = e.target.value.toLowerCase();

    if (!e.target.checked) {
      const newFilters = [...filters.filter((filter: string) => inputName !== filter)];
      setFilters(newFilters);

      Router.push({
        pathname: '/exercises',
        query: {
          groups: newFilters.join(',')
        }
      });
    } else {
      const newFilters = [...filters, inputName];
      setFilters(newFilters);

      Router.push({
        pathname: '/exercises',
        query: {
          groups: newFilters.join(',')
        }
      });
    }
  };

  return (
    <div className="relative | w-full  md:w-1/5 | flex-shrink-0">
      <div className="md:sticky  top-0 | md:pr-4">
        <h2 className="flex  items-center  justify-between | mb-2  py-2 | font-bold  uppercase" onClick={() => setOpen(!isOpen)}>
          Filters <span className="md:hidden">{isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}</span>
        </h2>

        <ol className={`mb-4 | overflow-hidden  ${isOpen ? '' : ' | h-0'}  md:h-auto`}>
          {muscleGroups.map(group => (
            <li key={group}>
              <label className="flex  items-center  mb-2  cursor-pointer">
                <input type="checkbox" name="groups" value={group} className="appearance-none  cursor-pointer | h-5  w-5 | mr-2 | border  border-white  rounded | checked:bg-green-600" checked={filters.includes(group.toLowerCase())} onChange={updateFilters} />

                {group}
              </label>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export { Filters }
