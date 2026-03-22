import { useTheme } from "./useTheme";
export const colorsList: any = {
    darkColors: {
        primary: '#16161e',
        secondary: '#1a1b26',
        exm: '#282a3a',
        static: {
            primary: '#16161e',
            secondary: '#1a1b26',
            third: '#dba400',
            text: {
                primary: '#ebebebff',
                secondary: '#adadadff',
            },
        },
        opacity: {
            primary: '#00000098',
        },
        text: {
            primary: '#ebebebff',
            secondary: '#adadadff',
        },
        button: {
            primary: '#dba400',
            secondary: '#a98003ff',
            subTab: {
                prim: '#2b2b2bff',
                second: '#a98003ff',
            },
        },
        shimmer: {
            first: ['#6161617c', '#2b2b2bff', '#6161617c'],
            second: ['#2b2b2bff', '#6161617c', '#2b2b2bff'],
        },
        bottomTab: {
            color: '#dba400',
            items: {
                primary: 'black',
                secondary: 'lightgray',
            },
        },
        subTab: {
            color: '#2b2b2bff',
            items: {
                primary: 'white',
                secondary: 'gray',
            },
        },
    },

    lightColors: {
        primary: '#eaeaeaff',
        secondary: 'white',
        exm: '#282a3a',
        static: {
            primary: '#16161e',
            secondary: '#1a1b26',
            third: '#dba400',
            text: {
                primary: '#ebebebff',
                secondary: '#adadadff',
            },
        },
        opacity: {
            primary: '#ffffffcc',
        },
        text: {
            primary: '#181818ff',
            secondary: '#494949ff',
        },
        button: {
            primary: '#dba400',
            secondary: '#a98003ff',
            subTab: {
                primary: '#dba400',
                secondary: '#a98003ff',
            },
        },
        shimmer: {
            colors: ['#eaeaeaff', 'white', '#eaeaeaff'],
        },
        bottomTab: {
            color: '#dba400',
            items: {
                primary: 'black',
                secondary: 'black',
            },
        },
        subTab: {
            color: 'white',
            items: {
                primary: 'black',
                secondary: 'gray',
            },
        },
    },
};

export const useColors = () => {
    const { colors } = useTheme();
    return colors;
};