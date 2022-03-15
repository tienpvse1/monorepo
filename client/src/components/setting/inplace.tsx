import { PUBLIC_USER_INFO } from '@constance/cookie';
import { setCookie } from '@cookies';
import { IUpdateAccountDto } from '@modules/account/dto/update-account.dto';
import { useUpdateAccount } from '@modules/account/mutation/account.patch';
import {
  Inplace as InplaceComponent,
  InplaceContent,
  InplaceDisplay,
} from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { CSSProperties, FC, useState } from 'react';
import { useCookies } from 'react-cookie';
interface InplaceProps {
  defaultValue: string;
  label?: string;
  inputStyle?: CSSProperties;
  field?: keyof IUpdateAccountDto;
  showToast: (message: 'success' | 'fail') => void;
}

export const Inplace: FC<InplaceProps> = ({
  defaultValue,
  label,
  inputStyle,
  field = 'firstName',
  showToast,
}) => {
  const { mutate } = useUpdateAccount();
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(false);
  const handleEnter = () => {
    setActive(false);
    mutate(
      { id: public_user_info.id, [field]: value },
      {
        onSuccess: (data) => {
          setCookie(
            PUBLIC_USER_INFO,
            JSON.stringify({ ...public_user_info, [field]: value }),
            0.5
          );

          showToast('success');
        },
        onError: (error) => {
          showToast('fail');
        },
      }
    );
  };
  return (
    <>
      <InplaceComponent
        style={{ ...inputStyle }}
        active={active}
        onToggle={(e) => setActive(e.value)}
      >
        <InplaceDisplay>
          <InputText
            disabled
            style={{ ...inputStyle, transform: 'translateX(-10px)', height: '42px' }}
            id={label}
            value={value}
          />
        </InplaceDisplay>
        <InplaceContent>
          <InputText
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEnter();
            }}
            style={inputStyle}
            id={label}
            defaultValue={defaultValue}
          />
        </InplaceContent>
      </InplaceComponent>
    </>
  );
};
