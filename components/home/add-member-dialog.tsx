import { Plus } from "lucide-react";
import { ChangeEvent } from "react";

type AddMemberDialogProps = {
  newMember: { name: string; birthdate: string };
  setNewMember: React.Dispatch<
    React.SetStateAction<{ name: string; birthdate: string }>
  >;
  onCancel: () => void;
  onAdd: () => void;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({
  newMember,
  setNewMember,
  onCancel,
  onAdd,
  handleDateChange,
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md">
      <form className="p-6" onSubmit={onAdd}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Add New Member</h2>
          {/* <ModeToggle /> */}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-foreground"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Birthday
            </label>
            <div className="relative">
              <input
                type="text"
                value={newMember.birthdate}
                onChange={handleDateChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10 placeholder-gray-400 text-foreground"
                placeholder="DD/MM/YYYY"
                maxLength={10}
              />
              {/* TODO: Add calender date picker */}
              {/* <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" /> */}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl transition-colors duration-200 font-medium text-foreground cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={onAdd}
            disabled={
              !newMember.name.trim() || newMember.birthdate.length !== 10
            }
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-200"
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default AddMemberDialog;
