import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Squinterview</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Task: Triangle Canvas</h1>
        <h2>Description</h2>
        <p>Create a web app with these two pages:</p>
        <h3>Page 1 (/)</h3>
        <ul>
          <li>Input Page</li>
          <li>
            Allow user to create 2D triangles by entering in their coordinate
            points.
          </li>
          <li>Allow deletion of these triangles.</li>
          <li>Prevent invalid triangles.</li>
          <li>Display the triangles in a list.</li>
          <li>Display each triangle on a canvas.</li>
        </ul>
        <Image
          src="/input_screen.png"
          alt={"input"}
          width={1063}
          height={462}
        ></Image>
        <h3>Page 2 (/Analytics)</h3>
        <ul>
          <li>Analytics Page</li>
          <li>
            Display all the individual corner points of each triangle on a
            canvas as a cloud of points.
          </li>
          <li>
            Determine the triangle with the largest possible size from the set
            of points. Highlight it on the canvas.
          </li>
          <li>
            Use this API(http://numbersapi.com/3) to get a trivia fact about
            area (rounded to nearest whole number) of the triangle and display
            it.
          </li>
        </ul>
        <Image
          src="/analytics_screen.png"
          alt={"analytics"}
          width={1066}
          height={465}
        ></Image>
        <h3>Additional Notes</h3>
        <ul>
          <li>Feel free to use any component/styling libraries you wish.</li>
          <li>
            Data should be stored locally to maintain continuity across browser
            sessions.
          </li>
          <li>
            The finished assignment will be presented by you sometime next week.
            Reach out to us when you are done and we can book a time.
          </li>
          <li>Please reach out if you have any questions.</li>
          <li>Have fun!</li>
        </ul>
      </main>
    </>
  );
}