import { CalendarHeart, Plus } from "lucide-react";
import { Github } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "../ui/theme-toggle";

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
          <Tooltip>
            <TooltipTrigger>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                iamold
              </h1>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hovering here won’t help. You&apos;re still old.</p>
              {/* <p>Because forgetting birthdays is the new normal.</p>
              <p>Age is just a number… but wow, that number’s big now!</p>
              <p>Helping you feel old, one date at a time.</p>
              <p>Your friendly age tracker—judgment-free!</p>
              <p>You blinked and now you&apos;re here.</p>
              <p>You’re not getting old, you’re leveling up!</p>
              <p>Every wrinkle is a story. Keep going!</p>
              <p>Time flies. You’re the pilot.</p>
              <p>Another year wiser. Look at you!</p>
              <p>Aging is proof that you&apos;re still winning.</p>
              <p>
                Congrats! You&apos;re aging like Java updates—frequent and confusing.
              </p>
              <p>Age is just a number… but wow, that number’s big now.</p>
              <p>You&apos;re not old, you&apos;re just...vintage!</p>
              <p>Still young at heart. Just… with more back pain.</p>
              <p>Clicking here won’t make you younger. We tried.</p> */}
            </TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <a
              className="block h-6 w-6"
              href="https://github.com/iamshubhamjangle/iamold"
              target="_blank"
            >
              <Github />
            </a>
          </TooltipTrigger>
          <TooltipContent>Contribute on github?</TooltipContent>
        </Tooltip>
        {/* <ModeToggle /> */}
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
