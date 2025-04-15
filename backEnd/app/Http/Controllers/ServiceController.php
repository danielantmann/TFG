<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Recupera una lista de todos los servicios.
     *
     * Este método obtiene todos los registros de servicios de la base de datos
     * y los devuelve en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @return \Illuminate\Http\JsonResponse Lista de servicios o mensaje de error.
     *
     * @throws \Exception Si ocurre un error al recuperar los servicios.
     */
    public function index()
    {
        try {
            $services = Service::all();
            return response()->json($services, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar los servicios',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacena un nuevo servicio en la base de datos.
     *
     * Este método valida los datos de entrada, crea un nuevo servicio con los datos proporcionados
     * y devuelve el servicio creado en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos del servicio.
     * @return \Illuminate\Http\JsonResponse Servicio creado o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Exception Si ocurre un error al crear el servicio.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'price_small' => 'required|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
                'price_medium' => 'required|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
                'price_large' => 'required|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
            ]);

            $service = Service::create($validatedData);

            return response()->json([
                'message' => 'Servicio creado exitosamente',
                'service' => $service
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al crear el servicio',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Muestra un servicio específico.
     *
     * Este método busca un servicio por su ID y lo devuelve en formato JSON.
     * Si el servicio no existe o ocurre un error, se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador del servicio.
     * @return \Illuminate\Http\JsonResponse Servicio encontrado o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el servicio no existe.
     * @throws \Exception Si ocurre un error al recuperar el servicio.
     */
    public function show(string $id)
    {
        try {
            $service = Service::findOrFail($id);
            return response()->json($service, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Servicio no encontrado',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar el servicio',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualiza un servicio existente en la base de datos.
     *
     * Este método valida los datos de entrada, actualiza el servicio con los datos proporcionados
     * y devuelve el servicio actualizado en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos del servicio.
     * @param string $id El identificador del servicio.
     * @return \Illuminate\Http\JsonResponse Servicio actualizado o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el servicio no existe.
     * @throws \Exception Si ocurre un error al actualizar el servicio.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'price_small' => 'sometimes|required|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
                'price_medium' => 'sometimes|required|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
                'price_large' => 'sometimes|required|numeric|regex:/^\d{1,6}(\.\d{1,2})?$/',
            ]);

            $service = Service::findOrFail($id);
            $service->update($validatedData);

            return response()->json([
                'message' => 'Servicio actualizado exitosamente',
                'service' => $service
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Servicio no encontrado',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al actualizar el servicio',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Elimina un servicio de la base de datos.
     *
     * Este método busca un servicio por su ID, lo elimina de la base de datos
     * y devuelve un mensaje de éxito en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador del servicio.
     * @return \Illuminate\Http\JsonResponse Mensaje de éxito o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el servicio no existe.
     * @throws \Exception Si ocurre un error al eliminar el servicio.
     */
    public function destroy(string $id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->delete();

            return response()->json([
                'message' => 'Servicio eliminado exitosamente'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Servicio no encontrado',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al eliminar el servicio',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}