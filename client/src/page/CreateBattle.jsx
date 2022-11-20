import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles";
import { useGlobalContext } from "../context";
import { CustomButton, CustomInput, GameLoad, PageHOC } from "../components";
import { Translation } from "react-i18next";
import { useTranslation } from "react-i18next";

const CreateBattle = () => {
  const { contract, gameData, battleName, setBattleName, setErrorMessage } =
    useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    if (battleName === "" || battleName.trim() === "") return null;

    try {
      await contract.createBattle(battleName);

      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}

      <div className="flex flex-col mb-5">
        <CustomInput
          label={t("create_battle_input_label")} //"Battle"
          placeHolder={t("create_battle_input_name")} //"Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton
          title={t("create_battle_button")} // "Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate("/join-battle")}>
        {t("create_battle_join_existing")}
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <Translation>
    {(t, { i18n }) => (
      <p>
        {t("create_battle")}
        <br />
        {t("create_battle_sub")}
      </p>
    )}
  </Translation>
);
