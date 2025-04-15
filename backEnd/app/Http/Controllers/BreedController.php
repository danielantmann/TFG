<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Breed;

class BreedController extends Controller
{
    /**
     * Recupera una lista de todas las razas.
     *
     * Este método obtiene todos los registros de razas de la base de datos
     * y los devuelve en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @return \Illuminate\Http\JsonResponse Lista de razas o mensaje de error.
     *
     * @throws \Exception Si ocurre un error al recuperar las razas.
     */
    public function index()
    {
        try {
            $breeds = Breed::all();
            return response()->json($breeds, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar las razas',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacena una nueva raza en la base de datos.
     *
     * Este método valida los datos de entrada, crea una nueva raza con los datos proporcionados
     * y devuelve la raza creada en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos de la raza.
     * @return \Illuminate\Http\JsonResponse Raza creada o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Exception Si ocurre un error al crear la raza.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'size' => 'required|string|max:255',
            ]);

            $breed = Breed::create($validatedData);

            return response()->json([
                'message' => 'Raza creada exitosamente',
                'breed' => $breed
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al crear la raza',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Muestra una raza específica.
     *
     * Este método busca una raza por su ID y la devuelve en formato JSON.
     * Si la raza no existe o ocurre un error, se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador de la raza.
     * @return \Illuminate\Http\JsonResponse Raza encontrada o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la raza no existe.
     * @throws \Exception Si ocurre un error al recuperar la raza.
     */
    public function show(string $id)
    {
        try {
            $breed = Breed::findOrFail($id);
            return response()->json($breed, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Raza no encontrada',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar la raza',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualiza una raza existente en la base de datos.
     *
     * Este método valida los datos de entrada, actualiza la raza con los datos proporcionados
     * y devuelve la raza actualizada en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos de la raza.
     * @param string $id El identificador de la raza.
     * @return \Illuminate\Http\JsonResponse Raza actualizada o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la raza no existe.
     * @throws \Exception Si ocurre un error al actualizar la raza.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'size' => 'sometimes|string|max:255',
            ]);

            $breed = Breed::findOrFail($id);
            $breed->update($validatedData);

            return response()->json([
                'message' => 'Raza actualizada exitosamente',
                'breed' => $breed
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Raza no encontrada',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al actualizar la raza',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Elimina una raza de la base de datos.
     *
     * Este método busca una raza por su ID, la elimina de la base de datos
     * y devuelve un mensaje de éxito en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador de la raza.
     * @return \Illuminate\Http\JsonResponse Mensaje de éxito o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la raza no existe.
     * @throws \Exception Si ocurre un error al eliminar la raza.
     */
    public function destroy(string $id)
    {
        try {
            $breed = Breed::findOrFail($id);
            $breed->delete();

            return response()->json([
                'message' => 'Raza eliminada exitosamente'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Raza no encontrada',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al eliminar la raza',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}