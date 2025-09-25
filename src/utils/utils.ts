export const addMarginBottom = (isMainPage: boolean, margin: number): string => {
	return isMainPage ? `mb-${margin}` : ""
}
