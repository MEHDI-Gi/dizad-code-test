import { useContext, useEffect } from 'react';
import { DataContext } from '../context/contextData';

export const useSize = () => {

    const {
        screenWidth, screenHeight,
        fullScreenWidth, fullScreenHeight,
        MEDscreen, setMEDscreen } = useContext(DataContext);

    useEffect(() => {
        if (fullScreenWidth <= 1080 && fullScreenHeight <= 2280) {
            setMEDscreen(true);
        }
    }, [fullScreenWidth, fullScreenHeight]);
    const Medium = MEDscreen;
    return {
        isMEDscreen: Medium,
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
