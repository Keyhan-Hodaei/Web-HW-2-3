import React from 'react';
import Shape, { ShapeType, ShapeData } from './Shape';

interface FooterProps {
  shapes: ShapeData[];
}

const Footer: React.FC<FooterProps> = ({ shapes }) => {
  const circleCount = shapes.filter(s => s.type === 'circle').length;
  const squareCount = shapes.filter(s => s.type === 'square').length;
  const triangleCount = shapes.filter(s => s.type === 'triangle').length;

  return (
    <div className='shape-counts'>
      <div className='shape-count'><Shape type='circle' /> {circleCount}</div>
      <div className='shape-count'><Shape type='square' /> {squareCount}</div>
      <div className='shape-count'><Shape type='triangle' /> {triangleCount}</div>
    </div>
  );
};

export default Footer;
