import { API_URL } from "./config";

export const getCategories = async () => {
    const res = await fetch(`${API_URL}list.php?c=list`);
    return await res.json();
}

export const getAreas = async () => {
    const res = await fetch(`${API_URL}list.php?a=list`);
    return await res.json();
}

export const getSearchMeals = async (searchTerm = 'Cake') => {

    const res = await fetch(`${API_URL}search.php?s=${searchTerm ?? ''}`);
    return await res.json();
}

export const filterByCategory = async (category) => {
    const res = await fetch(`${API_URL}filter.php?c=${category}`);
    return await res.json()
}

export const filterByArea = async (area) => {
    const res = await fetch(`${API_URL}filter.php?a=${area}`);
    return await res.json()
}

export const getMealById = async (id) => {
    const res = await fetch(`${API_URL}lookup.php?i=${id}`);
    return await res.json();
}