import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import { onError } from "lib/error-lib";
import { billUser } from "lib/api";
import BillingForm from "components/billing-form";
import config from "config";

const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const stripePromise = loadStripe(config.STRIPE_KEY);

  const handleFormSubmit = async (storage: number, response: any) => {
    const { token, error } = response;
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id,
      });

      alert("Your card has been charged successfully!");
      navigate("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="Settings">
      <Elements stripe={stripePromise}>
        <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
      </Elements>
    </div>
  );
};

export default Settings;
