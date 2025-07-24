import React from 'react';

export interface IProps {
  title: string;
  count: string | number;
  style: string;
  icon: any;
}

const OverViewCard = ({ title, count, style, icon: Icon }: IProps) => {
  return (
    <div
      className={`flex items-center justify-between  font-bold px-3 py-5 gap-4 ${style}`}
    >
      <section>
        <div className="text-xl">
          <p>{title}</p>
          <p>{count || 0}</p>
        </div>
      </section>
      <section>
        <Icon size={30} />
      </section>
    </div>
  );
};

export default OverViewCard;
