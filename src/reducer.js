export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    // token: 'BQDVqXlodJDSAiWxqgp7fUfKWCX4Dm3BaojGPYNrQEgdgscDR46SZjeFeKe2sG-688UFlzXMZZyOi6xM_0mT1-wjG0MG_F_Oo5mVS5aVoE-sVyRyEwKFI2Y9XbQDC8-87qjuus-gV4j3gxergZ-LXFzKzrkrdg',
    spotify: null,
    discover_weekly: null,
};

const reducer = (state, action) => {
    console.log(action);

    // Action => type, [payload]
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            };
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly
            };
        case 'SET_ITEM':
            return {
                ...state,
                item: action.item
            };
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing
            };
        default:
            return state;
    }
};

export default reducer;