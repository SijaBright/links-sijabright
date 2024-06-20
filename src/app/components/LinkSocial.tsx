'use client';

import {
  SiMaildotru,
  SiInstagram,
  SiTiktok
} from 'react-icons/si';
import { Social } from '@/typings';

const LinkSocial: React.FC<Social> = ({ href, title }) => {
  const getIcon = () => {
    if (title.includes('email')) return <SiMaildotru size='26px' />;
    if (title.includes('instagram')) return <SiInstagram size='26px' />;
    if (title.includes('tiktok')) return <SiTiktok size='26px' />;
    return null;
  };

  return (
    <a
      aria-label={`${title} link`}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='hover:scale-110 transition-all'
    >
      {getIcon()}
    </a>
  );
};

export default LinkSocial;
