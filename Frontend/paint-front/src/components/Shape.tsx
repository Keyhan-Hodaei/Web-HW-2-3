import React from 'react';

export type ShapeType = 'circle' | 'square' | 'triangle';
export interface ShapeData {
  type: ShapeType;
  x: number;
  y: number;
}

interface ShapeProps {
  type: ShapeType;
  size?: number;
  className?: string;
  x?: number;
  y?: number;
  style?: React.CSSProperties;
}

const Shape: React.FC<ShapeProps> = ({ type, size=40, className, x, y, style }) => {
  const wrapperStyle = x !== undefined && y !== undefined
                       ? { position: 'absolute' as const, left: x - size/2, top: y - size/2 }
                       : undefined;

  switch (type) {
    case 'circle':
      return (
        <div style={wrapperStyle}>
          <svg width={size} height={size} className={className} style={style}>
            <circle cx={size/2} cy={size/2} r={size/2 - 2} stroke='black' strokeWidth='2' fill='white' />
          </svg>
        </div>
      );
    case 'square':
      return (
        <div style={wrapperStyle}>
          <svg width={size} height={size} className={className} style={style}>
            <rect x={2} y={2} width={size-4} height={size-4} stroke='black' strokeWidth='2' fill='white' />
          </svg>
        </div>
      );
    case 'triangle':
      const points = `${size/2},2 2,${size-2} ${size-2},${size-2}`;
      return (
        <div style={wrapperStyle}>
          <svg width={size} height={size} className={className} style={style}>
            <polygon points={points} stroke='black' strokeWidth='2' fill='white' />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default Shape;
