<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dog;

class DogController extends Controller
{
    /**
     * Recupera una lista de todos los perros.
     *
     * Este método obtiene todos los registros de perros de la base de datos
     * y los devuelve en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @return \Illuminate\Http\JsonResponse Lista de perros o mensaje de error.
     *
     * @throws \Exception Si ocurre un error al recuperar los perros.
     */
    public function index()
    {
        try {
            $dogs = Dog::all();
            return response()->json($dogs, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar los perros',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacena un nuevo perro en la base de datos.
     *
     * Este método valida los datos de entrada, crea un nuevo perro con los datos proporcionados
     * y devuelve el perro creado en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos del perro.
     * @return \Illuminate\Http\JsonResponse Perro creado o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Exception Si ocurre un error al crear el perro.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'birth_date' => 'nullable|date_format:Y-m-d',
                'notes' => 'nullable|string',
                'id_user' => 'required|integer|exists:users,id',
                'id_breed' => 'required|integer|exists:breeds,id',
            ]);

            $dog = Dog::create($validatedData);

            return response()->json([
                'message' => 'Perro creado exitosamente',
                'dog' => $dog
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al crear el perro',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Muestra un perro específico.
     *
     * Este método busca un perro por su ID y lo devuelve en formato JSON.
     * Si el perro no existe o ocurre un error, se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador del perro.
     * @return \Illuminate\Http\JsonResponse Perro encontrado o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el perro no existe.
     * @throws \Exception Si ocurre un error al recuperar el perro.
     */
    public function show(string $id)
    {
        try {
            $dog = Dog::findOrFail($id);
            return response()->json($dog, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Perro no encontrado',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar el perro',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualiza un perro existente en la base de datos.
     *
     * Este método valida los datos de entrada, actualiza el perro con los datos proporcionados
     * y devuelve el perro actualizado en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos del perro.
     * @param string $id El identificador del perro.
     * @return \Illuminate\Http\JsonResponse Perro actualizado o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el perro no existe.
     * @throws \Exception Si ocurre un error al actualizar el perro.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'birth_date' => 'sometimes|nullable|date_format:Y-m-d',
                'notes' => 'sometimes|nullable|string',
                'id_user' => 'sometimes|required|integer|exists:users,id',
                'id_breed' => 'sometimes|required|integer|exists:breeds,id',
            ]);
            
            $dog = Dog::findOrFail($id);
            $dog->update($validatedData);

            return response()->json([
                'message' => 'Perro actualizado exitosamente',
                'dog' => $dog
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Perro no encontrado',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al actualizar el perro',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Elimina un perro de la base de datos.
     *
     * Este método busca un perro por su ID, lo elimina de la base de datos
     * y devuelve un mensaje de éxito en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador del perro.
     * @return \Illuminate\Http\JsonResponse Mensaje de éxito o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el perro no existe.
     * @throws \Exception Si ocurre un error al eliminar el perro.
     */
    public function destroy(string $id)
    {
        try {
            $dog = Dog::findOrFail($id);
            $dog->delete();

            return response()->json([
                'message' => 'Perro eliminado exitosamente'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Perro no encontrado',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al eliminar el perro',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}