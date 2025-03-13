import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import Spinner from "../spinner";
import { CheckCircle, XCircle } from "lucide-react";
import { generateBaseUsername } from "@/lib/helper";
import { BASE_URL } from "@/lib/base-url";

const CheckUsername = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(
    null
  );
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const { register, watch, setError, setValue, clearErrors } =
    useFormContext();
  const username = watch("username");

  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    if (debouncedUsername) {
      checkUsernameAvailability(debouncedUsername);
    }
  }, [debouncedUsername]);

  const checkUsernameAvailability = async (username: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/check-username?username=${username}`
      );
      const data = await response.json();
      setIsAvailable(data.isAvailable);
      setSuggestion([]);
      clearErrors("username");
      if (!data.isAvailable) {
        const generatedSuggestions = Array(4)
          .fill(null)
          .map(() => generateBaseUsername(username));
        setSuggestion(generatedSuggestions);
        setError("username", {
          message: "Username is already taken",
        });
      }
    } catch (error) {
      console.log(error);
      setError("username", {
        message: "Error checking username",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSuggestionClick = (suggestion: string) => {
    setValue("username", suggestion);
    clearErrors("username");
  };
  return (
    <div className="relative w-full">
      <Input
        placeholder="Enter Username"
        disabled={isLoading}
        className="form--input focus:border-0 dark:border-[rgba(255,255,255,.5)]"
        {...register("username")}
      />
      {/* Loader and Validation Icon */}
      <div className="absolute right-3 top-2 "> 
        {isLoading ? (
          <Spinner className="text-gray-600 !size-[20px]" />
        ) : isAvailable === true ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : isAvailable === false ? (
          <XCircle className="text-red-500" size={20} />
        ) : null}
      </div>
      {/* Suggested Usernames */}
      {isAvailable === false && suggestion.length > 0 && (
        <div className="mt-2 text-sm">
          <p className="mb-1">Suggestions</p>
          <ul className="flex flex-row gap-3 flex-wrap ml-[1px] text-base text-primary">
            {suggestion?.map((s) => (
              <li
                role="button"
                key={s}
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckUsername;
