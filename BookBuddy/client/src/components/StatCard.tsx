interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  bgColor: string;
  textColor: string;
}

const StatCard = ({ title, value, icon, bgColor, textColor }: StatCardProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${bgColor} rounded-lg p-3`}>
          <i className={`${icon} ${textColor} text-lg`}></i>
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
