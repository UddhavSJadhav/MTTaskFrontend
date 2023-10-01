import { Textarea, Button, useToast, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import ChakraCardView from "../components/ChakraCardView.jsx";

import useStore from "../store.js";
import { axiosOpen } from "../utils/axios.js";

const Dashboard = () => {
  const auth = useStore((state) => state.auth);
  const toast = useToast();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const getTasks = async () => {
    try {
      const response = await axiosOpen.get("/task");
      const data = response?.data?.data || [];
      setList([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    try {
      await axiosOpen.post("/task", { description });
      setLoading(false);
      getTasks();
      toast({
        title: "Task created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setDescription("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Task adding failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <section>
        <div className='max-w-screen-xl mx-auto px-2 py-10'>
          <div className='md:flex'>
            <div className='md:w-1/2'>
              <div className='m-2 border border-solid border-zinc-200 rounded bg-zinc-50 min-h-[500px] px-2 py-1'>
                <div className='text-xl font-bold text-center'>List</div>
                <hr className='my-2' />
                {loading && (
                  <div className='bg-white rounded px-2 py-3 font-bold text-center'>
                    Loading...
                  </div>
                )}
                {list.length === 0 ? (
                  <div className='bg-white rounded px-2 py-3 font-bold text-center'>
                    No items in list
                  </div>
                ) : (
                  <>
                    {!auth && (
                      <Alert status='warning' className='mb-2'>
                        <AlertIcon />
                        Login to perform actions on task.
                      </Alert>
                    )}
                    {list?.map((item) => (
                      <ChakraCardView
                        key={item._id}
                        item={item}
                        getTasks={getTasks}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className='md:w-1/2'>
              <div className='m-2 border border-solid border-zinc-200 rounded bg-zinc-50 px-2 py-1'>
                <div className='text-xl font-bold text-center'>New Task</div>
                <hr className='my-2' />
                {auth ? (
                  <form onSubmit={handleSubmit}>
                    <Textarea
                      placeholder='Task description...'
                      isInvalid={false}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className='flex mt-2 justify-end'>
                      <Button
                        colorScheme='gray'
                        onClick={() => setDescription("")}>
                        Clear
                      </Button>
                      <Button
                        type='submit'
                        className='ms-2'
                        colorScheme='green'
                        isLoading={loading}
                        loadingText='Saving'>
                        Save
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className='font-bold p-4 text-center'>
                    Login to add new Task
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
