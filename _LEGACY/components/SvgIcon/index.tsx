import * as Icons from '@assets/svgs';

export type SvgIconProps = {
  name: keyof typeof Icons;
  width?: string | number | undefined;
  height?: string | number | undefined;
  fill?: string;
  stroke?: string;
  style?: React.CSSProperties;
};
function SvgIcon({ name, width, height, fill, stroke, style }: SvgIconProps) {
  const Svg = Icons[name];
  return <Svg width={width} height={height} fill={fill} stroke={stroke ?? undefined} style={style || undefined} />;
}

export default SvgIcon;
