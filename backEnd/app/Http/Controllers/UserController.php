<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    /**
     * Recupera una lista de todos los usuarios.
     *
     * Este método obtiene todos los registros de usuarios de la base de datos
     * y los devuelve en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @return \Illuminate\Http\JsonResponse Lista de usuarios o mensaje de error.
     *
     * @throws \Exception Si ocurre un error al recuperar los usuarios.
     */
    public function index()
    {
        try {
            $users = User::all();
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar los usuarios', 
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacena un nuevo usuario en la base de datos.
     *
     * Este método valida los datos de entrada, crea un nuevo usuario con los datos proporcionados
     * y devuelve el usuario creado en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos del usuario.
     * @return \Illuminate\Http\JsonResponse Usuario creado o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Exception Si ocurre un error al crear el usuario.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'password' => 'required|string|min:8',
                'phone_number' => 'required|string|max:255|unique:users',
                'role' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'last_name' => $validatedData['last_name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'phone_number' => $validatedData['phone_number'],
                'role' => $validatedData['role'],
            ]);

            return response()->json([
                'message' => 'Usuario creado exitosamente',
                'user' => $user
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al crear el usuario',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Muestra un usuario específico.
     *
     * Este método busca un usuario por su ID y lo devuelve en formato JSON.
     * Si el usuario no existe o ocurre un error, se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador del usuario.
     * @return \Illuminate\Http\JsonResponse Usuario encontrado o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el usuario no existe.
     * @throws \Exception Si ocurre un error al recuperar el usuario.
     */
    public function show(string $id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user, 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Usuario no encontrado',
                'message' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar el usuario',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Actualiza un usuario existente en la base de datos.
     *
     * Este método valida los datos de entrada, actualiza el usuario con los datos proporcionados
     * y devuelve el usuario actualizado en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con los datos del usuario.
     * @param string $id El identificador del usuario.
     * @return \Illuminate\Http\JsonResponse Usuario actualizado o mensaje de error.
     *
     * @throws \Illuminate\Validation\ValidationException Si los datos de entrada no son válidos.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el usuario no existe.
     * @throws \Exception Si ocurre un error al actualizar el usuario.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'last_name' => 'sometimes|required|string|max:255',
                'password' => 'sometimes|required|string|min:8',
                'phone_number' => 'sometimes|required|string|max:255|unique:users,phone_number,' . $id,
                'role' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            ]);

            $user = User::findOrFail($id);

            $validatedData['password'] = bcrypt($validatedData['password']);

            $user->update($validatedData);

            return response()->json([
            'message' => 'Usuario actualizado exitosamente',
            'user' => $user
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
            'error' => 'Error de validación',
            'messages' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
            'error' => 'Usuario no encontrado',
            'message' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
            'error' => 'Error al actualizar el usuario',
            'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Elimina un usuario de la base de datos.
     *
     * Este método busca un usuario por su ID, lo elimina de la base de datos
     * y devuelve un mensaje de éxito en formato JSON. Si ocurre un error durante la operación,
     * se devuelve un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador del usuario.
     * @return \Illuminate\Http\JsonResponse Mensaje de éxito o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el usuario no existe.
     * @throws \Exception Si ocurre un error al eliminar el usuario.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'message' => 'Usuario eliminado exitosamente'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Usuario no encontrado',
                'message' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al eliminar el usuario',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    
    /**
     * Valida el inicio de sesión de un usuario.
     *
     * Este método verifica las credenciales proporcionadas (email y contraseña) y devuelve un token de autenticación
     * si las credenciales son válidas. Si las credenciales no son válidas o ocurre un error, se devuelve un mensaje de error.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP con las credenciales del usuario.
     * @return \Illuminate\Http\JsonResponse Token de autenticación o mensaje de error.
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if (!auth()->attempt($credentials)) {
                return response()->json([
                    'error' => 'Credenciales inválidas'
                ], 401);
            }

            $user = auth()->user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'token' => $token,
                'user' => $user
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al iniciar sesión',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Resumen de logout
     * 
     * Este método maneja la lógica para cerrar la sesión de un usuario.
     * 
     * @return mixed|\Illuminate\Http\JsonResponse Respuesta JSON indicando el resultado del cierre de sesión.
     */
    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();
            
            return response()->json([
                'message' => 'Cierre de sesión exitoso'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al cerrar sesión',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Devuelve las citas de un usuario ordenadas por fecha.
     *
     * Este método busca las citas asociadas a un usuario específico, las ordena por fecha
     * y las devuelve en formato JSON. Si el usuario no existe o ocurre un error, se devuelve
     * un mensaje de error con el código de estado correspondiente.
     *
     * @param string $id El identificador del usuario.
     * @return \Illuminate\Http\JsonResponse Lista de citas ordenadas o mensaje de error.
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si el usuario no existe.
     * @throws \Exception Si ocurre un error al recuperar las citas.
     */
    public function getAppointmentsByUser(string $id)
    {
        try {
            $user = User::findOrFail($id);

            $appointments = $user->appointments()->orderBy('created_at', 'desc')->get();

            return response()->json([
                'message' => 'Citas recuperadas exitosamente',
                'appointments' => $appointments
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Usuario no encontrado',
                'message' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al recuperar las citas',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

