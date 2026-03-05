import { useContext, useEffect } from 'react';
import { PixelRatio } from 'react-native';
import { DataContext } from '../context/contextData';

export const useSize = () => {

    const {
        screenWidth, screenHeight,
        fullScreenWidth, fullScreenHeight } = useContext(DataContext);

    const guidelineBaseWidth = 390;
    const guidelineBaseHeight = 844;

    /**
     * For Widths: use scale()
     * For Heights: use verticalScale()
     * For Font Sizes & Margins: use moderateScale()
     */
    const widthScale = (size: number) => (fullScreenWidth / guidelineBaseWidth) * size;
    const heightScale = (size: number) => (fullScreenHeight / guidelineBaseHeight) * size;
    const sizeScale = (size: number, factor = 0.5) => size + (widthScale(size) - size) * factor;
    return {
        widthScale,
        heightScale,
        sizeScale,
        screen: {
            width: screenWidth,
            height: screenHeight
        },
        fullScreen: {
            width: fullScreenWidth,
            height: fullScreenHeight
        },
        lessons: {
            category: {
                width: screenWidth * 0.43,
                height: screenWidth * 0.43 + 50
            },
            items: {
                width: screenWidth * 0.30,
                height: screenWidth * 0.20 + 50,
                rowSwipe: {
                    width: screenWidth * 0.9,
                    height: screenWidth * 0.9 + 200,
                }
            },
        },
        bookmarksSizes: {
            signs: {
                width: screenWidth * 0.20,
                height: screenWidth * 0.20,
            }
        },
        quiz: {
            width: screenWidth * 0.45,
            height: screenWidth * 0.3
        }
    };
};
