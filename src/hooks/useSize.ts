// hooks/useResponsiveImage.ts
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';

export const useSize = () => {

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const { width: fullScreenWidth, height: fullScreenHeight } = Dimensions.get('screen');
    return {
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
