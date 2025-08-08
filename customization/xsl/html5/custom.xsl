<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="xs">

  <!-- Import default HTML5 topic processing -->
  <xsl:import href="plugin:org.dita.html5:xsl/topic.xsl"/>

  <!-- Define lesson sequence directly in XSLT -->
  <xsl:variable name="lesson-map" as="element()*">
    <lesson current="dita_structured_authoring" next="part1_introduction_to_dita"/>
    <lesson current="part1_introduction_to_dita" next="why_structured_authoring_matters"/>
    <lesson current="why_structured_authoring_matters" next="key_benefits_structured_authoring"/>
    <lesson current="key_benefits_structured_authoring" next="what_is_dita"/>
    <lesson current="what_is_dita" next="advantages_of_using_dita"/>
    <lesson current="advantages_of_using_dita" next="dita_vs_other_standards"/>
    <lesson current="dita_vs_other_standards" next="summary_part1_key_takeaways"/>
    <lesson current="summary_part1_key_takeaways" next="quiz_introduction_to_dita"/>
    <lesson current="quiz_introduction_to_dita" next="part2_dita_maps"/>
    <lesson current="part2_dita_maps" next="what_are_dita_maps"/>
    <lesson current="what_are_dita_maps" next="organization_with_dita_maps"/>
    <lesson current="organization_with_dita_maps" next="relationship_tables_reltables"/>
    <lesson current="relationship_tables_reltables" next="navigation_with_dita_maps"/>
    <lesson current="navigation_with_dita_maps" next="summary_part2_key_takeaways"/>
    <lesson current="summary_part2_key_takeaways" next="quiz_dita_maps"/>
    <lesson current="quiz_dita_maps" next="part3_topic_types"/>
    <lesson current="part3_topic_types" next="concept_topics"/>
    <lesson current="concept_topics" next="task_topics"/>
    <lesson current="task_topics" next="reference_topics"/>
    <lesson current="reference_topics" next="glossary_entries"/>
    <lesson current="glossary_entries" next="troubleshooting_topics"/>
    <lesson current="troubleshooting_topics" next="summary_part3_key_takeaways"/>
    <lesson current="summary_part3_key_takeaways" next="quiz_topic_types"/>
    <lesson current="quiz_topic_types" next="part4_short_descriptions"/>
    <lesson current="part4_short_descriptions" next="definition_and_purpose_shortdesc"/>
    <lesson current="definition_and_purpose_shortdesc" next="structure_and_guidelines_shortdesc"/>
    <lesson current="structure_and_guidelines_shortdesc" next="examples_effective_ineffective_shortdesc"/>
    <lesson current="examples_effective_ineffective_shortdesc" next="summary_part4_key_takeaways"/>
    <lesson current="summary_part4_key_takeaways" next="quiz_short_descriptions"/>
    <lesson current="quiz_short_descriptions" next="part5_content_reuse"/>
    <lesson current="part5_content_reuse" next="why_content_reuse_is_important"/>
    <lesson current="why_content_reuse_is_important" next="attributes_for_content_reuse"/>
    <lesson current="attributes_for_content_reuse" next="examples_content_reuse"/>
    <lesson current="examples_content_reuse" next="summary_part5_key_takeaways"/>
    <lesson current="summary_part5_key_takeaways" next="quiz_content_reuse"/>
    <lesson current="quiz_content_reuse" next="publishing_dita_content"/>
    <lesson current="publishing_dita_content" next="dita_outputs"/>
    <lesson current="dita_outputs" next="language_translation_customization"/>
    <lesson current="language_translation_customization" next="summary_part_vi"/>
    <lesson current="summary_part_vi" next="quiz_publishing_dita_content"/>
    <lesson current="quiz_publishing_dita_content" next="conclusion"/>
    <lesson current="conclusion" next="next-steps"/>
    <!-- Last lesson has no next -->
    <lesson current="next-steps" next=""/>
  </xsl:variable>

  <!-- Get current topic filename from the document -->
  <xsl:variable name="current-topic-filename">
    <xsl:choose>
      <xsl:when test="/*/@original-file">
        <xsl:value-of select="replace(tokenize(/*/@original-file, '/')[last()], '\.dita$', '')"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="replace(tokenize(base-uri(), '/')[last()], '\.dita$', '')"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <!-- Find next lesson for current topic -->
  <xsl:variable name="next-lesson" select="$lesson-map[@current = $current-topic-filename]/@next"/>

  <!-- Override the topic body template to add navigation -->
  <xsl:template match="*[contains(@class,' topic/body ')]">
    <!-- Process the original body content -->
    <xsl:next-match/>
    
    <!-- Add next lesson button if there is a next lesson -->
    <xsl:if test="$next-lesson != ''">
      <nav class="next-lesson">
        <a href="{$next-lesson}.html" class="button">
          <xsl:text>Next Lesson →</xsl:text>
        </a>
      </nav>
    </xsl:if>
    </xsl:template>

<!-- Inject quiz inside the body of the quiz topic ONLY -->
<xsl:template match="*[contains(@class, ' topic/body ')][ancestor::*[@id = 'quiz_introduction_to_dita']]" mode="html5">
  <xsl:variable name="id" select="@id"/>

  <!-- Render original body content -->
  <xsl:next-match/>

  <!-- Quiz container and loader script go INSIDE the article body -->
  <div class="quiz-wrapper" id="quiz-intro-dita" data-quiz="quiz_introduction_to_dita.js">
    <p>Loading interactive quiz…</p>
  </div>
  <script src="customization/js/quiz-loader.js"/>
</xsl:template>

</xsl:stylesheet>
