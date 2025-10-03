import EventDetail from "@/components/root/EventDetail";

const SingleCoursePage = async ({
  params,
}: {
  params: Promise<{ event: string }>;
}) => {
  const { event } = await params;

  return (
    <div className="w-full">
      <EventDetail event_slug={event} />
    </div>
  );
};

export default SingleCoursePage;
