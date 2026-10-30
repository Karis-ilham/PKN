/*
 * Lapisan komunikasi frontend ke backend Laravel.
 * Belum dipanggil oleh UI demo. Teman yang mengerjakan backend dapat
 * menyamakan endpoint dan format JSON di file ini dengan API Laravel.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const result = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    throw result || { message: 'Terjadi kesalahan saat menghubungi server.' };
  }
  return result;
}

export const api = {
  login: (username, password) =>
    request('/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  logout: () => request('/logout', { method: 'POST' }),

  getCustomers: () => request('/customers'),

  createCustomer: (payload) =>
    request('/customers', { method: 'POST', body: JSON.stringify(payload) }),

  confirmPayment: (customerCode, payload) =>
    request(`/customers/${encodeURIComponent(customerCode)}/payments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  setInvoice: (customerCode, active) =>
    request(`/customers/${encodeURIComponent(customerCode)}/invoice`, {
      method: 'PATCH',
      body: JSON.stringify({ aktif: active }),
    }),
};
