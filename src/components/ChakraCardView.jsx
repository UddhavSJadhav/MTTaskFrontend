/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  Flex,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

import useStore from "../store.js";
import { axiosOpen } from "../utils/axios.js";

const ChakraCardView = ({ item, getTasks }) => {
  const auth = useStore((state) => state.auth);
  const toast = useToast();
  const [checked, setChecked] = useState(item?.flag || false);
  const [loading, setLoading] = useState(false);

  const handleChecked = () => {
    if (!auth) return;
    setChecked((prev) => {
      updateChecked(!prev);
      return !prev;
    });
  };

  const updateChecked = async (flag) => {
    setLoading(true);
    try {
      axiosOpen.patch(`/task/${item._id}`, { flag });
      setLoading(false);
      toast({
        title: "Task updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setChecked(item?.flag || false);
      setLoading(false);
      toast({
        title: "Task updating failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteTask = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await axiosOpen.delete(`/task/${item._id}`);
      setLoading(false);
      getTasks();
      toast({
        title: "Task deleted.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Task delition failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card className='mb-2'>
      <CardBody>
        <Flex>
          <Checkbox
            isChecked={checked}
            className='me-2'
            onChange={handleChecked}
            disabled={loading}
          />
          <Text flex='1' as={checked ? "del" : ""}>
            {item?.description}
          </Text>
          {auth && (
            <DeleteIcon
              color='red.500'
              onClick={deleteTask}
              className='cursor-pointer'
            />
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ChakraCardView;
