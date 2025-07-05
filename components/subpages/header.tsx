import { CalendarHeart, Plus } from "lucide-react";

type HeaderProps = {
  onAdd: () => void;
};
const Header: React.FC<HeaderProps> = ({ onAdd }) => (
  <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <CalendarHeart className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            iamold
          </h1>
        </div>
        <button
          onClick={onAdd}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-md font-semibold flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span>ADD</span>
        </button>
      </div>
    </div>
  </div>
);
export default Header;
