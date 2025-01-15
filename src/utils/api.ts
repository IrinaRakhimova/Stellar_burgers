const URL = 'https://norma.nomoreparties.space/api';

export interface Ingredient {
   _id: string;
   name: string;
   type: 'bun' | 'main' | 'sauce'; 
   proteins: number;
   fat: number;
   carbohydrates: number;
   calories: number;
   price: number;
   image: string;
   image_mobile: string;
   image_large: string;
   __v: number;
 }

 export const fetchIngredients = async (): Promise<Ingredient[]> => {
   try {
     const response = await fetch(URL + '/ingredients');
     
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
     
     const data = await response.json();
     return data.data; 
   } catch (error) {
     console.error("Error fetching ingredients:", error);
     throw error; 
   }
 };