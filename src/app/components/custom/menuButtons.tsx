import Icon from "@mdi/react";
import {
  mdiCamera,
  mdiWeatherNight,
  mdiDownload,
  mdiUpload,
  mdiHelpCircleOutline,
} from "@mdi/js";

const MenuButtons: React.FC = () => {
  return (
    <div className="mt-4 flex justify-between px-2 py-2">
      <button className="bg-gray-400 text-white p-3 rounded-full hover:bg-orange-500 transition cursor-pointer flex items-center justify-center">
        <Icon path={mdiCamera} size={1} />
      </button>
      <button className="bg-gray-400 text-white p-3 rounded-full hover:bg-orange-500 transition cursor-pointer flex items-center justify-center">
        <Icon path={mdiWeatherNight} size={1} />
      </button>
      <button className="bg-gray-400 text-white p-3 rounded-full hover:bg-orange-500 transition cursor-pointer flex items-center justify-center">
        <Icon path={mdiDownload} size={1} />
      </button>
      <button className="bg-gray-400 text-white p-3 rounded-full hover:bg-orange-500 transition cursor-pointer flex items-center justify-center">
        <Icon path={mdiUpload} size={1} />
      </button>
      <button className="bg-gray-400 text-white p-3 rounded-full hover:bg-orange-500 transition cursor-pointer flex items-center justify-center">
        <Icon path={mdiHelpCircleOutline} size={1} />
      </button>
    </div>
  );
};

export default MenuButtons;
