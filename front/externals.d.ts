declare module "*.less" {
	const content: any;
	//export = content;
	export default content;
}

declare module "*.png" {
	const content: any;
	//export = content;
	export default content;
}

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	//export = content;
	export default content;
}
