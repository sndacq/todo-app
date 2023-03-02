import { useState, FC } from 'react';
import { IComment } from '@/utils/types';
import { updateCommentApi, deleteCommentApi } from '@/api';
import {
  EditIcon, DeleteIcon, ConfirmIcon, CancelIcon,
} from './Icons';

interface ICommentProps {
  data: IComment;
  setShowModal: React.Dispatch<boolean>;
  setConfirmDelete: React.Dispatch<() => void>;
  refetch: () => void;
}

const Comment: FC<ICommentProps> = ({
  data, setShowModal, setConfirmDelete, refetch,
}) => {
  const { comment, id, todoId } = data;
  const [form, setForm] = useState('');
  const [edit, setEdit] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  };

  const handleEditClick = () => {
    setEdit(true);
    setForm(data.comment);
  };

  const handleSaveClick = () => {
    updateCommentApi(todoId, { ...data, comment: form })
      .then(() => {
        setEdit(false);
        refetch();
      }).catch((err) => console.error(err));
  };

  const handleCommentDelete = () => {
    deleteCommentApi(todoId, id as string).then(() => {
      setShowModal(false);
      refetch();
    }).catch((err) => console.error(err));
  };

  const handleCommentDeleteButton = () => {
    setShowModal(true);
    setConfirmDelete(() => handleCommentDelete);
  };

  return (
    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
      <div className="flex w-0 flex-1 items-center">
        {edit ? (
          <input
            className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Title"
            type="text"
            onChange={handleInputChange}
            value={form}
          />
        ) : (
          <span className="ml-2 w-0 flex-1 truncate">{comment}</span>
        )}
      </div>
      <div className="ml-4 flex">
        {!edit ? (
          <>
            <div role="button" onClick={handleEditClick}>
              <EditIcon />
            </div>
            <div role="button" onClick={handleCommentDeleteButton}>
              <DeleteIcon />
            </div>
          </>
        ) : (
          <>
            <div role="button" onClick={() => setEdit(false)}>
              <CancelIcon />
            </div>
            <div role="button" onClick={handleSaveClick}>
              <ConfirmIcon />
            </div>
          </>
        )}
      </div>
    </li>
  );
};
export default Comment;
