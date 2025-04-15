<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;

class AppointmentController extends Controller
{
    /**
     * Recupera una lista de todas las citas.
     *
     * Este método obtiene todos los registros de citas de la base de datos
     * y los devuelve en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @return \Illuminate\Http\JsonResponse Lista de citas o mensaje de error.
     *
     * @throws \Exception Si ocurre un error al recuperar las citas.
     */
    public function index()
    {
        try {
            $appointment = Appointment::orderBy("start_date", "desc")->get();
            return response()->json($appointment, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar las citas',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacena una nueva cita en la base de datos.
     *
     * Este método valida los datos de entrada, crea una nueva cita con los datos proporcionados
     * y devuelve la cita creada en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos de la cita.
     * @return \Illuminate\Http\JsonResponse Cita creada o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Exception Si ocurre un error al crear la cita.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'start_date' => 'required|date_format:Y-m-d H:i:s',
                'end_date' => 'required|date_format:Y-m-d H:i:s',
                'notes' => 'nullable|string',
                'final_price' => 'required|numeric',
                'id_dog' => 'required|integer|exists:dogs,id',
                'id_service' => 'required|integer|exists:services,id',
            ]);

            $appointment = Appointment::create($validatedData);

            return response()->json([
                'message' => 'Cita creada exitosamente',
                'appointment' => $appointment
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Datos de entrada no válidos',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Fallo al crear la cita',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Muestra una cita específica.
     *
     * Este método busca una cita por su ID y la devuelve en formato JSON.
     * Si la cita no existe o ocurre un error, se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador de la cita.
     * @return \Illuminate\Http\JsonResponse Cita encontrada o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la cita no existe.
     * @throws \Exception Si ocurre un error al recuperar la cita.
     */
    public function show(string $id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            return response()->json($appointment, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Cita no encontrada',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Fallo al recuperar la cita',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualiza una cita existente en la base de datos.
     *
     * Este método valida los datos de entrada, actualiza la cita con los datos proporcionados
     * y devuelve la cita actualizada en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos de la cita.
     * @param string $id El identificador de la cita.
     * @return \Illuminate\Http\JsonResponse Cita actualizada o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la cita no existe.
     * @throws \Exception Si ocurre un error al actualizar la cita.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'start_date' => 'sometimes|date_format:Y-m-d H:i:s',
                'end_date' => 'sometimes|date_format:Y-m-d H:i:s',
                'notes' => 'sometimes|nullable|string',
                'final_price' => 'sometimes|numeric',
                'id_dog' => 'sometimes|integer|exists:dogs,id',
                'id_service' => 'sometimes|integer|exists:services,id',
            ]);

            $appointment = Appointment::findOrFail($id);
            $appointment->update($validatedData);

            return response()->json([
                'message' => 'Cita actualizada exitosamente',
                'appointment' => $appointment
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Datos de entrada no válidos',
                'messages' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Cita no encontrada',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Fallo al actualizar la cita',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Elimina una cita de la base de datos.
     *
     * Este método busca una cita por su ID, la elimina de la base de datos
     * y devuelve un mensaje de éxito en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador de la cita.
     * @return \Illuminate\Http\JsonResponse Mensaje de éxito o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si la cita no existe.
     * @throws \Exception Si ocurre un error al eliminar la cita.
     */
    public function destroy(string $id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->delete();

            return response()->json([
                'message' => 'Cita eliminada exitosamente'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Cita no encontrada',
                'message' => $e->getMessage()
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Fallo al eliminar la cita',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}