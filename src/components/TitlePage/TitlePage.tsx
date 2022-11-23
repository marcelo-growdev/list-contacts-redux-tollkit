import React from 'react';
import './style.css';

interface TitlePageProps {
  title: string;
  subTitle?: string;
  classTitle?: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ title, subTitle, classTitle }) => {
  return (
    <>
      <h1 className={classTitle || 'title-page'}>{title}</h1>
      <h4>{subTitle}</h4>
    </>
  );
};

export default TitlePage;
