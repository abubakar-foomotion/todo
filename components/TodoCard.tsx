'use client';

interface TodoCardProps {
     id: string,
  heading: string,
  description: string,
  deleteFunction: (id: string) => void,
  updateFunction: (id: string) => void,
}

export default function TodoCard(
    {id, heading, description, deleteFunction, updateFunction}: TodoCardProps
) {
    return(
        <div className="border border-gray-400 rounded-lg p-2 bg-gray-200 ">
            <h3>{heading}</h3>
                <p>{description}</p>
                <p
                  onClick={() => updateFunction(id)}
                  className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-20"
                >
                  UPDATE
                </p>
                <span
                  onClick={async () => {
                    //
                    deleteFunction(id);
                  }}
                >
                  &#10060;
                </span>
        </div>
    )
}
