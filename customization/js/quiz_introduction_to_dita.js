<h3>Quiz: Introduction to DITA</h3>
<form onsubmit="event.preventDefault(); checkQuiz(this)">
  <fieldset>
    <legend>1. What is the primary goal of structured authoring?</legend>
    <label><input type="radio" name="q1" value="0"> a) Add more images to documents</label><br>
    <label><input type="radio" name="q1" value="1"> b) Enable consistent, reusable, and scalable content creation</label><br>
    <label><input type="radio" name="q1" value="0"> c) Use fewer tools</label><br>
    <label><input type="radio" name="q1" value="0"> d) None of the above</label>
  </fieldset>

  <fieldset>
    <legend>2. Which of the following is NOT a core principle of DITA?</legend>
    <label><input type="radio" name="q2" value="0"> a) Topic-based authoring</label><br>
    <label><input type="radio" name="q2" value="0"> b) Separation of content and format</label><br>
    <label><input type="radio" name="q2" value="0"> c) Conditional publishing</label><br>
    <label><input type="radio" name="q2" value="1"> d) Proprietary format</label>
  </fieldset>

  <fieldset>
    <legend>3. How does DITA support multi-channel publishing?</legend>
    <label><input type="radio" name="q3" value="0"> a) It restricts output to PDF only</label><br>
    <label><input type="radio" name="q3" value="0"> b) By embedding fonts</label><br>
    <label><input type="radio" name="q3" value="1"> c) By separating content from presentation</label><br>
    <label><input type="radio" name="q3" value="0"> d) By using Markdown</label>
  </fieldset>

  <fieldset>
    <legend>4. Which business challenge does DITA's content reuse capability primarily solve?</legend>
    <label><input type="radio" name="q4" value="0"> a) Poor search engine optimization</label><br>
    <label><input type="radio" name="q4" value="1"> b) Duplicate content maintenance across multiple documents</label><br>
    <label><input type="radio" name="q4" value="0"> c) Lack of version control</label><br>
    <label><input type="radio" name="q4" value="0"> d) Inadequate user interface design</label>
  </fieldset>

  <fieldset>
    <legend>5. When should an organization typically choose DITA over simpler markup formats like Markdown?</legend>
    <label><input type="radio" name="q5" value="0"> a) When they have only one publication target</label><br>
    <label><input type="radio" name="q5" value="0"> b) When their content is primarily narrative rather than procedural</label><br>
    <label><input type="radio" name="q5" value="1"> c) When they need advanced content reuse, conditional publishing, or professional multi-format output</label><br>
    <label><input type="radio" name="q5" value="0"> d) When they want to minimize their toolchain complexity</label>
  </fieldset>

  <button type="submit">Submit</button>
</form>
<div id="quiz-result"></div>

<script>
function checkQuiz(form) {
  const answers = ["q1", "q2", "q3", "q4", "q5"];
  let score = 0;
  answers.forEach((q) => {
    const selected = form[q].value;
    if (selected === "1") score++;
  });
  const result = document.getElementById("quiz-result");
  result.innerHTML = `<p>You scored ${score} out of ${answers.length}</p>`;
}
</script>
