import React, { useRef, useEffect, useCallback, useState } from 'react';
import SessionForm from './forms/SessionForm';
import RetreatForm from './forms/RetreatForm';
import ProductForm from './forms/ProductForm';

type AddItemType = "session" | "retreat" | "product";

interface AddItemModalProps {
  onClose: () => void;
  selectedAddType: AddItemType;
  setSelectedAddType: (type: AddItemType) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  onClose,
  selectedAddType,
  setSelectedAddType,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleEscape, handleClickOutside]);

  const handleTypeSelect = (type: AddItemType) => {
    setSelectedAddType(type);
    setStep(2);
  };

  const handleFormSubmit = (formData: any) => {
    console.log(formData);
    // Reset modal state and close
    setStep(1);
    setSelectedAddType("session"); // Reset to default
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-[32px] shadow-xl p-10 w-full max-w-5xl mx-4 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold"
        >
          &times;
        </button>

        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: "#0f131a" }}>Add to Marketplace</h2>
            <p className="text-center text-gray-600 mb-8">Choose what you want to publish first.</p>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => handleTypeSelect("retreat")}
                className="w-80 py-4 rounded-2xl font-semibold hover:shadow-md transition-all text-lg border-2 hover:border-opacity-80"
                style={{ color: "#1a5d47", borderColor: "#1a5d47", backgroundColor: "transparent" }}
              >
                Retreat
              </button>
              <button
                onClick={() => handleTypeSelect("session")}
                className="w-80 py-4 rounded-2xl font-semibold hover:shadow-md transition-all text-lg border-2 hover:border-opacity-80"
                style={{ color: "#1a5d47", borderColor: "#1a5d47", backgroundColor: "transparent" }}
              >
                Session
              </button>
              <button
                onClick={() => handleTypeSelect("product")}
                className="w-80 py-4 rounded-2xl font-semibold hover:shadow-md transition-all text-lg border-2 hover:border-opacity-80"
                style={{ color: "#1a5d47", borderColor: "#1a5d47", backgroundColor: "transparent" }}
              >
                Product
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "#0f131a" }}>Add New {selectedAddType.charAt(0).toUpperCase() + selectedAddType.slice(1)}</h2>
            {selectedAddType === "session" && <SessionForm onSubmit={handleFormSubmit} />}
            {selectedAddType === "retreat" && <RetreatForm onSubmit={handleFormSubmit} />}
            {selectedAddType === "product" && <ProductForm onSubmit={handleFormSubmit} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItemModal;

