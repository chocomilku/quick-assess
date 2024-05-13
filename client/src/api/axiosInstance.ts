import { ApiResponse } from "@/interfaces/ApiResponse";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_API_URL as string,
	withCredentials: true,
});

// Overload signatures
async function axiosServerFetch<T>(
	url: string,
	method: "GET",
	options?: AxiosRequestConfig
): Promise<ApiResponse<T>>;
async function axiosServerFetch<T>(
	url: string,
	method: "POST",
	data: any,
	options?: AxiosRequestConfig
): Promise<ApiResponse<T>>;
async function axiosServerFetch<T>(
	url: string,
	method: "PUT",
	data: any,
	options?: AxiosRequestConfig
): Promise<ApiResponse<T>>;
async function axiosServerFetch<T>(
	url: string,
	method: "DELETE",
	options?: AxiosRequestConfig
): Promise<ApiResponse<T>>;

// Implementation signature
async function axiosServerFetch<T>(
	url: string,
	method: string,
	data?: any,
	options?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
	try {
		let response;
		switch (method) {
			case "GET":
				response = await axiosInstance.get<T>(url, options);
				break;
			case "POST":
				response = await axiosInstance.post<T>(url, data, options);
				break;
			case "PUT":
				response = await axiosInstance.put<T>(url, data, options);
				break;
			case "DELETE":
				response = await axiosInstance.delete<T>(url, options);
				break;
			default:
				throw new Error(`Unsupported method: ${method}`);
		}

		if (response.data) {
			return {
				data: response.data,
				error: undefined,
			};
		}

		return {
			data: undefined,
			error: "No data received",
		};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return {
				data: undefined,
				error: err.response?.data.message,
			};
		} else {
			return {
				data: undefined,
				error: (err as Error).message,
			};
		}
	}
}

export const axiosFetch = axiosServerFetch;

export default axiosInstance;
