// hooks/useResponsiveImage.ts
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';

export const useSize = () => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    return {
        // 3 categories across screen
        screen: {
            width: screenWidth,
            height: screenHeight,
        },

        // Full width lesson cover
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
        // Quiz thumbnails
        quiz: {
            width: screenWidth * 0.45,
            height: screenWidth * 0.3
        }
    };
};
