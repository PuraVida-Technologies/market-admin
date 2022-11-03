import styles from "./styles.module.scss";
import { CreditCardOutlined, EditOutlined, SwapOutlined } from "@ant-design/icons";

const TagActionsColumn = (): JSX.Element => {
  return (
    <div className={styles.noBreak}>
      <a className={styles.actionLink}>
        <EditOutlined />
      </a>
      <a className={styles.actionLink}>
        <CreditCardOutlined />
      </a>
      <a className={styles.actionLink}>
        <SwapOutlined />
      </a>
    </div>
  );
};

export default TagActionsColumn;
