import { supabase } from './supabase';

export const TMBD_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers : {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }   
}

export const fetchMovies = async(query: string) => {

    const endpoint = query 
        ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    try{
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: TMBD_CONFIG.headers,
        });

        if(!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data.results;
    }catch (error) {
        throw error;
    }
    
}

export const fetchMovieDetails = async(movieId: string) => {
    try{
        const response = await fetch(`${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMBD_CONFIG.headers,
        });

        if(!response.ok) {
            throw new Error('Failed to fetch movie details')
        }

        const data = await response.json();

        return data;
        
    }catch(err) {
        throw new Error('Failed to fetch movie details')
    }
}

export const fecthMovieMetrics = async(movie: Movie) => {
    try {
        const {data: metrics, error} = await supabase
            .from('metrics')
            .select('*')
            .eq('movie_id', movie.id)
            .single();
        
        if(error) {
            return null;
        }

        return metrics;

    }catch(err) {
        return null;
        
    }
}

export const updateSearchCount = async (query: string, movie: Movie) => {
    const metrics: TrendingMovie = await fecthMovieMetrics(movie);

    try{
        if (metrics) {
            const {data, error} = await supabase
                .from('metrics')
                .update({count: metrics.count + 1})
                .eq("id", metrics.id);
            
            if(error) {
                return null;
            }

            return data;

        }
        else {
            const new_metric: TrendingMovie = {
                searchTerm: query,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movie.id,
                title: movie.title
            }

            const { data, error } = await supabase
                .from('metrics')
                .insert([new_metric])
                .select();
            
            if(error) {
                return null
            }

            return data
        }
    }catch(err) {
        return null;
    }
}

export const fetchTrendingMovies = async() => {
    try {
        const {data: trending_movies, error} = await supabase
            .from('metrics')
            .select('*')
            .order("count", {ascending: false})
            .limit(5);
            
        if(error) {
            return [];
        }

        return trending_movies;

    }catch(err) {
        return [];
        
    }
}

