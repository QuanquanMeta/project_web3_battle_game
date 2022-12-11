import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CustomButton,
  CustomInput,
  PageHOC,
  LanguageSelect,
} from "../components";
import { useGlobalContext } from "../context";
import { useTranslation } from "react-i18next";
import { Translation } from "react-i18next";

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 500000,
        });

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate("/create-battle"), 8000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate("/create-battle");
    };

    if (contract) createPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label={t("home_card_name")}
          placeHolder={t("home_card_plyaer_name")}
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title={t("home_card_register")}
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    )
  );
};

export default PageHOC(
  Home,

  <Translation>
    {(t, { i18n }) => (
      <p>
        {t("home_welcome")}
        <br />
        {t("home_web3")}
      </p>
    )}
  </Translation>,
  <Translation>
    {(t, { i18n }) => (
      <p>
        {t("home_start_to_play")}
        <br />
        {t("home_card_game")}
      </p>
    )}
  </Translation>
);
