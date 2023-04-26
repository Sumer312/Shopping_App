import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  return {
    props: {
      sellerToken: req.cookies.seller,
      consumerToken: req.cookies.consumer,
    },
  };
};
