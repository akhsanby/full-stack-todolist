type Props = {
  jwtToken?: string;
  decodeToken: {
    user_id: string;
    username: string;
  };
};

type EditingProps = {
  todoId: string;
  isEdit: boolean;
  text: string;
};

export type { Props, EditingProps };
