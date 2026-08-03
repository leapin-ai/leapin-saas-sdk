const pickReferenceItems = reference => {
  if (!reference || typeof reference !== 'object') {
    return [];
  }
  const raw = reference.chunks || reference.items || reference.docs || reference.documents;
  if (Array.isArray(raw)) {
    return raw.filter(Boolean);
  }
  if (Array.isArray(reference)) {
    return reference.filter(Boolean);
  }
  return [];
};

const itemTitle = item => item.title || item.document_name || item.doc_name || item.name || item.id || 'Reference';

const itemUrl = item => item.url || item.link || item.source_url || item.document_url || item.src || '';

const itemSnippet = item => item.content || item.text || item.snippet || item.summary || '';

/**
 * Build side-panel friendly markdown from RAG reference payload.
 */
export const formatReferenceMarkdown = reference => {
  const items = pickReferenceItems(reference);
  if (items.length === 0) {
    return '';
  }

  const propsItems = items.slice(0, 12).map((item, index) => {
    const title = String(itemTitle(item));
    const url = itemUrl(item);
    const snippet = String(itemSnippet(item)).slice(0, 200);
    return {
      key: String(item.id || index),
      title,
      url: url || undefined,
      snippet: snippet || undefined
    };
  });

  return [
    '```yml',
    'md-components:',
    '  type: ReferenceList',
    '  props:',
    '    title: References',
    '    items:',
    ...propsItems.flatMap(item => {
      const lines = [`      - key: ${JSON.stringify(item.key)}`, `        title: ${JSON.stringify(item.title)}`];
      if (item.url) {
        lines.push(`        url: ${JSON.stringify(item.url)}`);
      }
      if (item.snippet) {
        lines.push(`        snippet: ${JSON.stringify(item.snippet)}`);
      }
      return lines;
    }),
    '```'
  ].join('\n');
};

/**
 * Create parseChunk for rag-chatbot SSE.
 * Server sends cumulative `data.answer`; end event is `{ code:0, data:true }`.
 * Reference markdown is appended only on done so answer deltas stay contiguous.
 *
 * @param {{ current: string }} lastAnswerRef
 * @param {{ current: any }} referenceRef
 * @param {{ current: boolean }} referenceAppendedRef
 */
export const createParseRagChunk = (lastAnswerRef, referenceRef, referenceAppendedRef) => {
  return chunk => {
    if (chunk == null) {
      return null;
    }

    if (typeof chunk === 'string') {
      try {
        chunk = JSON.parse(chunk);
      } catch (e) {
        return { content: chunk, done: false };
      }
    }

    const finishWithReference = () => {
      let extra = '';
      if (!referenceAppendedRef.current) {
        const referenceMd = formatReferenceMarkdown(referenceRef.current);
        if (referenceMd) {
          extra = `\n\n${referenceMd}`;
          referenceAppendedRef.current = true;
        }
      }
      return { content: extra, done: true };
    };

    if (chunk.code === 0 && chunk.data === true) {
      return finishWithReference();
    }

    if (chunk.data === true) {
      return finishWithReference();
    }

    const payload = chunk.data && typeof chunk.data === 'object' ? chunk.data : chunk;
    if (!payload || typeof payload !== 'object') {
      return null;
    }

    if (payload.reference) {
      referenceRef.current = payload.reference;
    }

    const answer = payload.answer == null ? '' : String(payload.answer);
    const prev = lastAnswerRef.current || '';
    let delta = '';
    if (answer.startsWith(prev)) {
      delta = answer.slice(prev.length);
    } else if (answer) {
      delta = answer;
    }
    lastAnswerRef.current = answer;

    return {
      id: payload.id,
      role: 'assistant',
      content: delta,
      done: false,
      reference: payload.reference,
      suggestion: payload.suggestion
    };
  };
};

export default createParseRagChunk;
