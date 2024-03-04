import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../redux/features/tasks/taskApi';

const TaskCard = ({ task }) => {
  const [update,] = useUpdateTaskMutation()
  const [deleteTask,] = useDeleteTaskMutation()
  console.log(task)

  let updatedStatus;

  if (task.status === 'pending') {
    updatedStatus = 'running';
  } else if (task.status === 'running') {
    updatedStatus = 'done';
  } else {
    updatedStatus = 'archive';
  }

  let backStatus;

  if (task.status === 'done') {
    backStatus = 'running'
  }
  else if (task.status === 'running') {
    backStatus = 'pending'
  }

  console.log(backStatus)

  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3 ${task.priority === 'high' ? 'text-red-500' : ' '
          } ${task.priority === 'medium' ? 'text-yellow-500' : ' '} ${task.priority === 'low' ? 'text-green-500' : ' '
          }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignedTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          {task.status === 'archive' || task.status === 'pending' ? '' :
            <button title='Get Back'
              onClick={() => {
                update({ id: task._id, status: backStatus })
              }}
            ><ArrowLeftIcon className="h-5 w-5 text-primary" /></button>}
          <button onClick={() => deleteTask(task._id)} title="Delete">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
          <button
            onClick={() => {
              update({ id: task._id, status: updatedStatus });

            }
            }
            title="Update Status"
          >
            {task.status === 'archive' ? '' : <ArrowRightIcon className="h-5 w-5 text-primary" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
