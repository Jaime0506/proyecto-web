import React from 'react';

export const FormControl: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-1">{children}</div>;
};

export const FormField: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col space-y-2">{children}</div>;
};

export const FormLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => {
  return (
    <label {...props} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
};

export const FormMessage: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return <p className="text-sm text-red-500">{message}</p>;
};

export const FormItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};
export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
    return (
      <form {...props} className="space-y-6">
        {children}
      </form>
    );
  };