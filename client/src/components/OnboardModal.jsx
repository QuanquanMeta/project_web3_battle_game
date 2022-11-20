/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from "../styles";
import CustomButton from "./CustomButton";
import { useGlobalContext } from "../context";
import { GetParams, SwitchNetwork } from "../utils/onboard.js";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);
  const { t } = useTranslation();

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on("chainChanged", () => {
      resetParams();
    });

    window?.ethereum?.on("accountsChanged", () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>{t("onboard_text")}</p>
            <CustomButton
              title={t("onboard_donwload_wallet")} //"Download Core"
              //handleClick={() => window.open('https://core.app/', '_blank')}
              handleClick={() =>
                window.open("https://metamask.io/download/", "_blank")
              }
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              {t("onboard_account_not_connected")}
            </p>
            <CustomButton
              title={t("onboard_connect_account")} //"Connect Account"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>{t("onboard_different_network")}</p>
            <CustomButton
              title={t("onboard_swtich")} //"Switch"
              handleClick={SwitchNetwork}
            />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>{t("onboard_no_avax_token")}</p>
            <CustomButton
              title={t("onboard_get_toekn")} //"Grab some test tokens"
              handleClick={() =>
                window.open("https://faucet.avax.network/", "_blank")
              }
            />
          </>
        );

      default:
        return <p className={styles.modalText}>{t("onboard_good_to_go")}</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
      <div className="language-select">
        <LanguageSelect />
      </div>
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;
