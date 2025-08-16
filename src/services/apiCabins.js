import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {

     const { data, error } = await supabase.from('cabins').select('*');

     if (error) {
          console.error(error);
          throw new Error("Cabins could not to be loaded");
     }

     return data;

}

export async function createEditCabin(newCabin, id) {

     const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

     const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
     const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

     // CREATE / EDİT
     let query = supabase.from("cabins");

     // CREATE 
     if (!id) {
          query = query.insert([{ ...newCabin, image: imagePath }]);
     }

     // EDİT
     if (id) {
          query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
     }

     const { data, error } = await query.select().single();

     if (error) {
          console.error(error);
          throw new Error("Cabins could not to be created");
     }

     // CREATE CABİN WİTH İMAGES
     const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

     if (storageError) {
          await supabase.from('cabins').delete().eq('id', data.id);

          console.error(error);
          throw new Error("Cabin image could not to be uploaded");
     }

     return data;

}

export async function deleteCabin(id) {


     const { data, error } = await supabase.from('cabins').delete().eq('id', id);

     if (error) {
          console.error(error);
          throw new Error("Cabins could not to be deleted");
     }

     return data;

}